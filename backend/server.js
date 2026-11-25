const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const RESTAURANT_WHATSAPP = '917200451980';
const DB_FILE = path.join(__dirname, 'orders.json');

app.use(cors());
app.use(express.json());

// Initialize persistent DB file if not exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

function getOrdersFromDB() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (e) {
    return [];
  }
}

function saveOrderToDB(newOrder) {
  const currentOrders = getOrdersFromDB();
  currentOrders.unshift(newOrder); // newest first
  fs.writeFileSync(DB_FILE, JSON.stringify(currentOrders, null, 2));
  return currentOrders;
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'Sri Lakshmi HomeFood Backend API', 
    whatsapp: RESTAURANT_WHATSAPP,
    db: 'Connected (orders.json)'
  });
});

// Create Order -> Settles in Database & Returns direct WhatsApp Bot link
app.post('/api/orders', (req, res) => {
  try {
    const {
      custName,
      custWhatsApp,
      packageName,
      deliveryArea,
      deliveryTimeSlot,
      fullAddress,
      deliveryDate,
      specialNotes = '',
      planType = 'Daily Plan'
    } = req.body;

    if (!custName || !custWhatsApp) {
      return res.status(400).json({ error: 'Customer Name and WhatsApp Number are required.' });
    }

    const orderId = `SLHF-${Date.now().toString().slice(-6)}`;
    const timestamp = new Date().toISOString();

    const orderRecord = {
      orderId,
      custName,
      custWhatsApp,
      packageName: packageName || 'Homestyle Food Plan',
      planType,
      deliveryArea: deliveryArea || 'Guduvancherry',
      deliveryTimeSlot: deliveryTimeSlot || 'Afternoon Lunch',
      fullAddress: fullAddress || 'Address will be provided on chat',
      deliveryDate: deliveryDate || 'Earliest available',
      specialNotes,
      status: 'New Order Received',
      createdAt: timestamp
    };

    // Settle directly into persistent database file
    saveOrderToDB(orderRecord);
    console.log(`[DB SUCCESS] Order settled in database: ${orderId} from ${custName} (${custWhatsApp})`);

    // Clean formatted message for WhatsApp (No pricing details, no colored emojis)
    const waBotMessage = 
`*NEW ORDER - Sri Lakshmi Home Food*
Order Ref: ${orderId}
--------------------------------
Name: ${custName}
Phone: ${custWhatsApp}
Plan: ${orderRecord.packageName}
Date: ${orderRecord.deliveryDate}
Time Slot: ${orderRecord.deliveryTimeSlot}
Delivery Area: ${orderRecord.deliveryArea}
Address: ${orderRecord.fullAddress}${specialNotes ? `\nNotes: ${specialNotes}` : ''}
--------------------------------
Please confirm my homestyle delivery schedule.`;

    const whatsappUrl = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(waBotMessage)}`;

    res.status(201).json({
      success: true,
      message: 'Order successfully settled in database and WhatsApp bot triggered',
      order: orderRecord,
      whatsappUrl
    });
  } catch (err) {
    console.error('Error saving order:', err);
    res.status(500).json({ error: err.message });
  }
});

// Serve static frontend / root files with cache optimization for assets
app.use('/assets', express.static(path.join(__dirname, '..', 'assets'), { maxAge: '7d' }));
app.use(express.static(path.join(__dirname, '..'), { maxAge: '1h' }));

// View all database orders
app.get('/api/orders', (req, res) => {
  const orders = getOrdersFromDB();
  res.json({ total: orders.length, orders });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n======================================================`);
  console.log(`Sri Lakshmi HomeFood Server Running:`);
  console.log(`  Local:   http://localhost:${PORT}`);
  console.log(`  Network: http://192.168.24.42:${PORT}`);
  console.log(`======================================================\n`);
  console.log(`Orders will settle in: ${DB_FILE}`);
});
