// Volunteer form submission
document.getElementById('volunteer-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        skills: formData.get('skills'),
        availability: formData.get('availability')
    };

    try {
        const response = await fetch('/volunteer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        const messageDiv = document.getElementById('message');
        if (response.ok) {
            messageDiv.textContent = result.message;
            messageDiv.className = 'message success';
            e.target.reset();
        } else {
            messageDiv.textContent = result.message || 'An error occurred';
            messageDiv.className = 'message error';
        }
    } catch (error) {
        console.error('Error:', error);
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = 'An error occurred while submitting the form';
        messageDiv.className = 'message error';
    }
});

// Payment form submission
document.getElementById('payment-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        email: formData.get('email'),
        amount: parseFloat(formData.get('amount')),
        payment_id: 'PAY_' + Math.random().toString(36).substr(2, 9)
    };

    try {
        const response = await fetch('/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        const messageDiv = document.getElementById('message');
        if (response.ok) {
            messageDiv.textContent = result.message;
            messageDiv.className = 'message success';
            e.target.reset();
            
            // Simulate payment verification (in a real app, this would be handled by the payment gateway)
            await fetch('/api/payment/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ payment_id: data.payment_id })
            });
        } else {
            messageDiv.textContent = result.message || 'An error occurred';
            messageDiv.className = 'message error';
        }
    } catch (error) {
        console.error('Error:', error);
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = 'An error occurred while processing the payment';
        messageDiv.className = 'message error';
    }
});