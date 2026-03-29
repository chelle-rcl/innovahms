import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookingId = searchParams.get('bookingId');
  const [status, setStatus] = useState('loading'); // 'loading' | 'done' | 'error'

  useEffect(() => {
    const markPaid = async () => {
      try {
        const res = await fetch(`/api/bookings/${bookingId}/mark-paid`, {
          method: 'PATCH'
        });
        if (res.ok) {
          setStatus('done');
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    };

    if (bookingId) markPaid();
  }, [bookingId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-6">
      <div className="text-center space-y-5 max-w-sm">

        {status === 'loading' && (
          <>
            <Loader2 size={56} className="animate-spin text-[#bf9b30] mx-auto" />
            <h1 className="text-2xl font-black text-zinc-900 dark:text-white">Confirming Payment...</h1>
            <p className="text-zinc-500 text-sm">Please wait, do not close this page.</p>
          </>
        )}

        {status === 'done' && (
          <>
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 mx-auto">
              <CheckCircle2 size={48} className="text-emerald-500" />
            </div>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-white">Payment Successful!</h1>
            <p className="text-zinc-500 text-sm">Thank you for your payment! See you at the hotel! 🎉</p>
            <button
              onClick={() => navigate('/customer/mybookings')}
              className="w-full py-3 rounded-xl bg-[#bf9b30] text-white font-bold text-sm hover:scale-[1.02] transition-all"
            >
              View My Bookings
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <h1 className="text-2xl font-black text-zinc-900 dark:text-white">Something went wrong</h1>
            <p className="text-zinc-500 text-sm">Your payment may have gone through but we couldn't update your booking. Please contact support.</p>
            <button
              onClick={() => navigate('/customer/mybookings')}
              className="w-full py-3 rounded-xl bg-zinc-800 text-white font-bold text-sm"
            >
              Go to My Bookings
            </button>
          </>
        )}

      </div>
    </div>
  );
}