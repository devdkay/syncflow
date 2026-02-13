export default function CalendlyButton() {
    const openCalendly = () => {
        const calendly = (window as any).Calendly;

        if (calendly) {
            calendly.initPopupWidget({
                url: "https://calendly.com/syncflow-ca/30min",
            });
        } else {
            alert("Calendly is still loading, please try again in a moment.");
        }
    };

    return (
        <button className="calendly-custom-btn" onClick={openCalendly}>
            Book a Free Call
        </button>
    );
}
