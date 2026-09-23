// pages/Account/PaymentMethods.jsx
// หน้าจัดการช่องทางชำระเงิน — เพิ่มระบบ Add New Method และจัดการช่องทางชำระเงิน
import { useState } from 'react';
import { useAccount } from '../../src/context/AccountContext';
import { CreditCard, QrCode, Wallet, Building2, Trash2, CheckCircle, Plus, X } from 'lucide-react';

export default function PaymentMethods() {
  const { profile, updateProfile } = useAccount();
  const paymentMethods = profile?.paymentMethods || ['Credit Card (**** 4242)', 'PromptPay QR'];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('card');
  const [defaultIdx, setDefaultIdx] = useState(0);

  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvc: '',
    truemoneyPhone: '',
    selectedBank: 'SCB',
    bankAccountNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMethod = async (e) => {
    e.preventDefault();
    let newMethodLabel = '';

    if (selectedType === 'card') {
      const last4 = formData.cardNumber.replace(/\s+/g, '').slice(-4) || '8888';
      newMethodLabel = `Credit Card (**** ${last4})`;
    } else if (selectedType === 'promptpay') {
      newMethodLabel = 'PromptPay QR';
    } else if (selectedType === 'truemoney') {
      const phone = formData.truemoneyPhone || '08x-xxx-xxxx';
      newMethodLabel = `TrueMoney Wallet (${phone})`;
    } else if (selectedType === 'bank') {
      const bank = formData.selectedBank || 'SCB';
      newMethodLabel = `Bank Account (${bank})`;
    }

    const updatedMethods = [...paymentMethods, newMethodLabel];
    if (updateProfile) {
      await updateProfile({ paymentMethods: updatedMethods });
    }

    // Reset and close
    setFormData({
      cardName: '',
      cardNumber: '',
      expDate: '',
      cvc: '',
      truemoneyPhone: '',
      selectedBank: 'SCB',
      bankAccountNumber: '',
    });
    setIsModalOpen(false);
  };

  const handleRemove = async (index) => {
    const updatedMethods = paymentMethods.filter((_, idx) => idx !== index);
    if (updateProfile) {
      await updateProfile({ paymentMethods: updatedMethods });
    }
    if (defaultIdx === index) {
      setDefaultIdx(0);
    } else if (defaultIdx > index) {
      setDefaultIdx((prev) => prev - 1);
    }
  };

  const getIcon = (methodStr) => {
    const str = methodStr.toLowerCase();
    if (str.includes('card') || str.includes('visa') || str.includes('master')) {
      return <CreditCard className="w-5 h-5 text-gray-700" />;
    }
    if (str.includes('promptpay') || str.includes('qr')) {
      return <QrCode className="w-5 h-5 text-gray-700" />;
    }
    if (str.includes('truemoney') || str.includes('wallet')) {
      return <Wallet className="w-5 h-5 text-gray-700" />;
    }
    return <Building2 className="w-5 h-5 text-gray-700" />;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <h2 className="font-sans font-bold text-xl text-gray-900">
          Payment Methods
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-black text-white font-sans font-semibold text-xs rounded-xl hover:bg-gray-800 shadow-sm transition-all cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add New Method
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {paymentMethods.map((method, idx) => (
          <div
            key={idx}
            className={`p-5 border bg-gray-50/50 rounded-2xl flex flex-col gap-3 relative transition-all shadow-2xs ${
              idx === defaultIdx ? 'border-black bg-white shadow-xs' : 'border-gray-200/80 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-gray-100 rounded-xl">
                  {getIcon(method)}
                </div>
                <div className="font-sans font-bold text-sm text-gray-900">{method}</div>
              </div>

              {idx === defaultIdx ? (
                <span className="flex items-center gap-1 bg-black text-white font-sans font-semibold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-2xs">
                  <CheckCircle className="w-3 h-3" />
                  Default
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setDefaultIdx(idx)}
                  className="text-xs text-gray-400 hover:text-black font-medium transition cursor-pointer"
                >
                  Set Default
                </button>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="font-sans text-xs text-gray-500">Active payment channel</span>
              {paymentMethods.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="text-red-500 hover:text-red-700 transition p-1 cursor-pointer"
                  title="Remove method"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding New Payment Method */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-5">
              <h3 className="font-bold text-lg text-gray-900">Add New Payment Method</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMethod} className="space-y-4">
              {/* Method Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedType('card')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition text-center ${
                    selectedType === 'card'
                      ? 'bg-black text-white border-black'
                      : 'bg-[#F0F0F0] text-gray-700 border-transparent hover:bg-gray-200'
                  }`}
                >
                  Credit / Debit
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('promptpay')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition text-center ${
                    selectedType === 'promptpay'
                      ? 'bg-black text-white border-black'
                      : 'bg-[#F0F0F0] text-gray-700 border-transparent hover:bg-gray-200'
                  }`}
                >
                  QR PromptPay
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('truemoney')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition text-center ${
                    selectedType === 'truemoney'
                      ? 'bg-black text-white border-black'
                      : 'bg-[#F0F0F0] text-gray-700 border-transparent hover:bg-gray-200'
                  }`}
                >
                  TrueMoney
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('bank')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition text-center ${
                    selectedType === 'bank'
                      ? 'bg-black text-white border-black'
                      : 'bg-[#F0F0F0] text-gray-700 border-transparent hover:bg-gray-200'
                  }`}
                >
                  Bank Account
                </button>
              </div>

              {/* Dynamic Inputs based on selected type */}
              {selectedType === 'card' && (
                <div className="space-y-3 pt-2">
                  <input
                    type="text"
                    name="cardName"
                    placeholder="Cardholder Name"
                    value={formData.cardName}
                    onChange={handleChange}
                    className="h-11 w-full rounded-xl bg-[#F0F0F0] px-4 text-sm outline-none placeholder:text-black/40 focus:bg-white focus:ring-1 focus:ring-black/20"
                    required
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_110px_90px] gap-3">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="h-11 rounded-xl bg-[#F0F0F0] px-4 text-sm outline-none placeholder:text-black/40 focus:bg-white focus:ring-1 focus:ring-black/20"
                      required
                    />
                    <input
                      type="text"
                      name="expDate"
                      placeholder="MM/YY"
                      value={formData.expDate}
                      onChange={handleChange}
                      className="h-11 rounded-xl bg-[#F0F0F0] px-4 text-center text-sm outline-none placeholder:text-black/40 focus:bg-white focus:ring-1 focus:ring-black/20"
                      required
                    />
                    <input
                      type="text"
                      name="cvc"
                      placeholder="CVC"
                      value={formData.cvc}
                      onChange={handleChange}
                      className="h-11 rounded-xl bg-[#F0F0F0] px-4 text-center text-sm outline-none placeholder:text-black/40 focus:bg-white focus:ring-1 focus:ring-black/20"
                      required
                    />
                  </div>
                </div>
              )}

              {selectedType === 'promptpay' && (
                <div className="rounded-2xl bg-[#F0F0F0] p-5 text-center my-2">
                  <p className="text-sm font-bold text-black">PromptPay QR Code</p>
                  <p className="mt-1 text-xs text-black/60">รองรับ Mobile Banking ทุกธนาคาร</p>
                  <p className="mt-3 text-xs text-gray-500">ช่องทางนี้จะสร้าง QR Code อัตโนมัติเมื่อสั่งซื้อสินค้า</p>
                </div>
              )}

              {selectedType === 'truemoney' && (
                <div className="rounded-2xl bg-[#F0F0F0] p-5 space-y-3 my-2">
                  <p className="text-xs font-bold text-black/80">ชำระผ่าน TrueMoney Wallet</p>
                  <input
                    type="tel"
                    name="truemoneyPhone"
                    placeholder="เบอร์โทรศัพท์ที่ผูกกับ TrueMoney Wallet (10 หลัก)"
                    value={formData.truemoneyPhone}
                    onChange={handleChange}
                    className="h-11 w-full rounded-xl bg-white px-4 text-sm outline-none placeholder:text-black/40 focus:ring-1 focus:ring-black/20"
                    required
                  />
                  <p className="text-[11px] text-black/50">* ระบบจะส่งข้อความแจ้งเตือนไปยังแอป TrueMoney เพื่อยืนยันการชำระเงิน</p>
                </div>
              )}

              {selectedType === 'bank' && (
                <div className="rounded-2xl bg-[#F0F0F0] p-5 space-y-3 my-2">
                  <p className="text-xs font-bold text-black/80">ผูกบัญชีธนาคาร (Direct Bank Debit)</p>
                  <select
                    name="selectedBank"
                    value={formData.selectedBank}
                    onChange={handleChange}
                    className="h-11 w-full rounded-xl bg-white px-4 text-sm outline-none focus:ring-1 focus:ring-black/20 text-black cursor-pointer"
                  >
                    <option value="SCB">ธนาคารไทยพาณิชย์ (SCB)</option>
                    <option value="KBANK">ธนาคารกสิกรไทย (KBank)</option>
                    <option value="KTB">ธนาคารกรุงไทย (Krungthai)</option>
                    <option value="BBL">ธนาคารกรุงเทพ (Bangkok Bank)</option>
                    <option value="TTB">ธนาคารทหารไทยธนชาต (ttb)</option>
                    <option value="BAY">ธนาคารกรุงศรีอยุธยา (BAY)</option>
                  </select>
                  <input
                    type="text"
                    name="bankAccountNumber"
                    placeholder="เลขที่บัญชีธนาคาร"
                    value={formData.bankAccountNumber}
                    onChange={handleChange}
                    className="h-11 w-full rounded-xl bg-white px-4 text-sm outline-none placeholder:text-black/40 focus:ring-1 focus:ring-black/20"
                    required
                  />
                  <p className="text-[11px] text-black/50">* ระบบจะนำคุณไปยังหน้า Mobile Banking ของธนาคารที่เลือกเพื่อยืนยันการผูกบัญชี</p>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-black text-white text-xs font-semibold hover:bg-gray-800 transition cursor-pointer active:scale-95"
                >
                  Save Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}