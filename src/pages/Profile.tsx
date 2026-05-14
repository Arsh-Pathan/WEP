import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Phone, User, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button, Card } from '../components/ui';

interface EmergencyProfile {
  id: string;
  name: string;
  age: string;
  relation: string;
  status: string;
  meetingPoint: string;
  headName: string;
  contact: string;
}

const Profile = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<EmergencyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedData = localStorage.getItem('wep_family_data');
    if (savedData) {
      const family = JSON.parse(savedData);
      const member = family.members.find((m: any) => m.id === memberId);
      if (member) {
        setData({
          ...member,
          meetingPoint: family.meetingPoint,
          headName: family.headName,
          contact: family.contact
        });
      }
    }
    setLoading(false);
  }, [memberId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-google-blue border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-google-grey font-medium">Retrieving Emergency Profile...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-md mx-auto py-20 px-6 text-center">
        <AlertTriangle size={64} className="text-google-red mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-2">ID Not Found</h2>
        <p className="text-google-grey mb-8">This QR code does not match any registered emergency profile in our local records.</p>
        <Button onClick={() => navigate('/')} className="w-full">
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-google-red rounded-full text-xs font-bold uppercase tracking-widest mb-4">
          <AlertTriangle size={14} /> Emergency Profile Found
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">{data.name}</h1>
        <p className="text-google-grey font-bold">{data.relation} • {data.age} Years Old</p>
      </div>

      <div className="space-y-6">
        {/* ACTION CARD */}
        <Card className="border-2 border-google-blue bg-blue-50">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-google-blue text-white rounded-xl shadow-lg shadow-blue-200">
              <MapPin size={28} />
            </div>
            <div>
              <p className="text-xs font-black text-google-blue uppercase tracking-widest mb-1">Rescue Action Required</p>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Escort to Meeting Point</h3>
              <p className="text-lg font-black text-google-blue underline decoration-2 underline-offset-4">
                {data.meetingPoint}
              </p>
            </div>
          </div>
        </Card>

        {/* FAMILY INFO */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <User className="text-google-grey" size={20} />
            <h4 className="font-bold text-gray-900">Family Identification</h4>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-google-grey font-medium">Family Head</span>
              <span className="text-sm font-bold text-gray-900">{data.headName}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-sm text-google-grey font-medium">Emergency Contact</span>
              <a href={`tel:${data.contact}`} className="flex items-center gap-2 text-google-blue font-bold hover:underline">
                <Phone size={16} /> {data.contact}
              </a>
            </div>
          </div>
        </Card>

        {/* RESCUER ACKNOWLEDGEMENT */}
        <div className="pt-6">
          <Button 
            className="w-full h-16 text-lg font-black uppercase tracking-widest shadow-xl shadow-green-100" 
            variant="primary"
            style={{ backgroundColor: '#34A853' }} // Google Green
            onClick={() => {
              alert('Reunification process started. Family head will be notified via SMS (Simulation).');
            }}
          >
            <CheckCircle className="mr-3" size={24} /> I Have Found This Person
          </Button>
          <p className="text-center text-[10px] text-google-grey mt-4 uppercase font-bold tracking-widest">
            Verified by War Emergency Portal (WEP)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
