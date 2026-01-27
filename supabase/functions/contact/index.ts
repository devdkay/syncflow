import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Resend } from 'npm:resend@2.0.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// Rate limiting store (in-memory for this example)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitStore.get(ip)
  
  if (!limit || now > limit.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 60000 }) // 1 minute window
    return false
  }
  
  if (limit.count >= 5) { // Max 5 requests per minute
    return true
  }
  
  limit.count++
  return false
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function generateCustomerEmailHTML(data: any): string {
  return `<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; background:#0b1220; padding:20px; color:#ffffff;">
  <div style="max-width:600px; margin:auto; background:#121a2a; padding:30px; border-radius:12px;">
    <h2 style="color:#00c2ff;">Thanks for contacting SyncFlow 🚀</h2>
    <p>Hi <strong>${data.fullName}</strong>,</p>
    <p>We've received your request and our team will review it shortly.</p>

    <h3 style="color:#00c2ff;">Your Request Summary</h3>
    <p><strong>Service Needed:</strong> ${data.service}</p>
    <p><strong>Business Name:</strong> ${data.businessName || 'N/A'}</p>
    <p><strong>Budget Range:</strong> ${data.budget || 'N/A'}</p>
    <p><strong>Timeline:</strong> ${data.timeline || 'N/A'}</p>
    <p><strong>Message:</strong><br>${data.message}</p>

    <p>We will contact you within <strong>24 hours</strong> to discuss your project.</p>

    <hr style="border:1px solid #222;">
    <p style="font-size:14px; color:#888;">
      SyncFlow – Websites, Automation & Business Systems<br>
      This is an automated confirmation email.
    </p>
  </div>
</body>
</html>`
}

function generateAdminEmailHTML(data: any, pageUrl: string): string {
  const timestamp = new Date().toLocaleString()
  
  return `<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; padding:20px;">
  <div style="max-width:600px; margin:auto; background:#f9f9f9; padding:30px; border-radius:8px;">
    <h2 style="color:#333;">New SyncFlow Contact Request</h2>
    
    <div style="background:#fff; padding:20px; border-radius:8px; margin:20px 0;">
      <h3 style="color:#00c2ff; margin-top:0;">Contact Information</h3>
      <p><strong>Full Name:</strong> ${data.fullName}</p>
      <p><strong>Business Name:</strong> ${data.businessName || 'Not provided'}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
    </div>
    
    <div style="background:#fff; padding:20px; border-radius:8px; margin:20px 0;">
      <h3 style="color:#00c2ff; margin-top:0;">Project Details</h3>
      <p><strong>Service Needed:</strong> ${data.service}</p>
      <p><strong>Budget Range:</strong> ${data.budget || 'Not specified'}</p>
      <p><strong>Timeline:</strong> ${data.timeline || 'Not specified'}</p>
      <p><strong>Message:</strong><br>${data.message}</p>
    </div>
    
    <div style="background:#fff; padding:20px; border-radius:8px; margin:20px 0;">
      <h3 style="color:#00c2ff; margin-top:0;">Submission Details</h3>
      <p><strong>Submitted:</strong> ${timestamp}</p>
      <p><strong>Page URL:</strong> ${pageUrl}</p>
    </div>
  </div>
</body>
</html>`
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }

  try {
    // Rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown'
    if (isRateLimited(clientIP)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const body = await req.json()
    const {
      fullName,
      businessName,
      email,
      phone,
      service,
      message,
      budget,
      timeline,
      pageUrl,
      company_website // honeypot field
    } = body

    // Honeypot check - if filled, return success but don't send emails
    if (company_website && company_website.trim() !== '') {
      return new Response(
        JSON.stringify({ success: true, message: 'Request received successfully' }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate required fields
    if (!fullName || !email || !service || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: Full Name, Email Address, Service Needed, and Message are required.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate email format
    if (!validateEmail(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address format.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Initialize Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    const fromEmail = Deno.env.get('FROM_EMAIL')
    const adminEmail = Deno.env.get('ADMIN_EMAIL')

    if (!resendApiKey || !fromEmail || !adminEmail) {
      console.error('Missing environment variables:', { resendApiKey: !!resendApiKey, fromEmail: !!fromEmail, adminEmail: !!adminEmail })
      return new Response(
        JSON.stringify({ error: 'Server configuration error. Please try again later.' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const resend = new Resend(resendApiKey)

    const formData = {
      fullName,
      businessName,
      email,
      phone,
      service,
      message,
      budget,
      timeline
    }

    // Send customer confirmation email
    const customerEmailResult = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: 'Thanks for contacting SyncFlow',
      html: generateCustomerEmailHTML(formData)
    })

    // Send admin notification email
    const adminEmailResult = await resend.emails.send({
      from: fromEmail,
      to: [adminEmail],
      subject: `New SyncFlow Request: ${service} - ${fullName}`,
      html: generateAdminEmailHTML(formData, pageUrl || 'Not provided')
    })

    console.log('Email results:', { customerEmailResult, adminEmailResult })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Request received — check your email for confirmation.',
        emailIds: {
          customer: customerEmailResult.data?.id,
          admin: adminEmailResult.data?.id
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process request. Please try again later.' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})