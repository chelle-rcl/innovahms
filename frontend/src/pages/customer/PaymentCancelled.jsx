import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

export default function PaymentCancelled() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-6">
      <div className="text-center space-y-5 max-w-sm">

        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 mx-auto">
          <XCircle size={48} className="text-red-500" />
        </div>
        <h1 className="text-3xl font-black text-zinc-900 dark:text-white">Payment Cancelled</h1>
        <p className="text-zinc-500 text-sm">
          No charges were made. Your booking is still reserved — you can try paying again anytime.
        </p>
        <button
          onClick={() => navigate('/customer/mybookings')}
          className="w-full py-3 rounded-xl bg-zinc-800 dark:bg-zinc-700 text-white font-bold text-sm hover:scale-[1.02] transition-all"
        >
          Back to My Bookings
        </button>

      </div>
    </div>
  );
}