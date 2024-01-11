const { CheckTransactionState,GetPaymentHistory } = require('../Business/ApiCall');

exports.CheckTransactionValidity = async (req, res, next) => {
    const date = req.body.date;
    const amount = req.body.amount;
    const token = req.body.token;

    try {
        const result = await CheckTransactionState(date, amount, token);

        // Check if result contains an 'error' property
        if (result && result.error) {
            console.error('Error in transaction validation:', result.error);
            return res.status(500).json({ error: result.error.message });
        }

        // Continue with your logic if there was no error
        // For example, you might want to send a success response
        return res.status(200).json({ message: 'Transaction validation successful', result });
    } catch (error) {
        console.error('Error in CheckTransactionValidity:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}

exports.GetPaymentHistory = async(req,res,next)=>{
    const clientId = req.body.clientId;

    try {
        const result = await GetPaymentHistory(clientId);

        // Check if result contains an 'error' property
        if (result && result.error) {
            return res.status(500).json({ error: result.error.message });
        }

        // Continue with your logic if there was no error
        // For example, you might want to send a success response
        return res.status(200).json({ message: 'Transaction validation successful', result });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}