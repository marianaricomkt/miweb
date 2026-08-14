(function () {
    'use strict';

    var form = document.getElementById('contact-form');
    var status = document.getElementById('contact-form-status');

    if (!form || !status) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var submitButton = form.querySelector('button[type="submit"]');
        var formData = new FormData(form);

        if (formData.get('_honey')) return;

        status.textContent = 'Enviando...';
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
        }

        fetch(form.action, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
            .then(function (response) {
                if (!response.ok) throw new Error('No se pudo enviar el formulario.');
                return response.json();
            })
            .then(function (data) {
                if (!data.success) throw new Error(data.message || 'No se pudo enviar el formulario.');

                form.reset();
                status.textContent = '✓ Gracias por tu mensaje. Recibí tu consulta y te voy a contactar pronto.';
                status.classList.add('success');
            })
            .catch(function () {
                status.textContent = 'No pudimos enviar tu mensaje. Por favor, intentá nuevamente en unos minutos.';
                status.classList.remove('success');
            })
            .finally(function () {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Enviar consulta';
                }
            });
    });
})();
