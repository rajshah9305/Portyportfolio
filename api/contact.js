export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Simulate processing time
  // In a real scenario, you might use SendGrid, Mailgun, or another service here

  console.log(`Contact form submission received from ${name} (${email})`);

  return res.status(200).json({
    success: true,
    message: 'Message received successfully. We will get back to you soon!',
    receivedData: {
      name,
      email,
      timestamp: new Date().toISOString()
    }
  });
}
