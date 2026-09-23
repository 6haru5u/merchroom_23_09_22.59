import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import registerLoginImage from '../../../assets/source-Image/Register_Login.jpg';

export default function AuthLayout({ children }) {
  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src={registerLoginImage}
          alt="Model holding a light stick while sitting next to collectible vinyl records"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/30 to-black/60" />
      </div>

      <div className="relative flex flex-col items-center justify-center bg-white px-6 py-12">
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink/70 transition hover:text-ink hover:underline"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}