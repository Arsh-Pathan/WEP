import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, Scan, MapPin } from 'lucide-react';
import { Button } from '../components/ui';

const Home = () => {
  const navigate = useNavigate();

  const handleRescuerScan = () => {
    const id = window.prompt('ENTER WEP-ID (e.g., MBR-123456789-0):');
    if (id) {
      navigate(`/profile/${id.trim()}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="flex flex-col items-center text-center max-w-2xl">
        <div className="w-20 h-20 bg-google-blue rounded-2xl flex items-center justify-center text-white shadow-lg mb-8">
          <ShieldCheck size={48} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
          WEP
        </h1>
        <p className="text-xl text-google-grey mb-12">
          War Emergency Portal
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-12">
          <div className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-xl">
            <Users className="text-google-blue mb-4" size={32} />
            <h3 className="font-semibold mb-2">For Families</h3>
            <p className="text-sm text-google-grey mb-4 text-center">
              Register your members and set a safe meeting point.
            </p>
            <Button onClick={() => navigate('/register')} className="w-full">
              Register Family
            </Button>
          </div>

          <div className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-xl">
            <Scan className="text-google-red mb-4" size={32} />
            <h3 className="font-semibold mb-2">For Rescuers</h3>
            <p className="text-sm text-google-grey mb-4 text-center">
              Identify lost individuals and find their safe location.
            </p>
            <Button variant="danger" className="w-full" onClick={handleRescuerScan}>
              Scan QR Code
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-8 text-google-grey text-sm">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>Decentralized Reunification</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} />
            <span>Privacy Secured</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
