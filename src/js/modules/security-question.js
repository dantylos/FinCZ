export function initSecurityQuestion() {
    const select = document.getElementById('security-question-select');
    const customInput = document.getElementById('custom-security-question');

    if (!select || !customInput) return;

    select.addEventListener('change', () => {
        const isCustom = select.value === 'custom';
        customInput.classList.toggle('hidden', !isCustom);
        customInput.required = isCustom;
    });
}
