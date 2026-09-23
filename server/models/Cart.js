// Schema สำหรับจัดการตะกร้าสินค้า (Cart Schema)
// ผูกกับ User และเก็บรายการสินค้าพร้อมจำนวน โดยเปิด timestamps อัตโนมัติ
const mongoose = require('mongoose'); 

const CartSchema = new mongoose.Schema({ 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    
    items: [{ 
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, 
        variant_id: mongoose.Schema.Types.ObjectId, 
        quantity: { type: Number, default: 1 } 
    }]
}, { 
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
}); 

module.exports = mongoose.model('Cart', CartSchema);
