import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, MapPin, QrCode, LogOut, Search, User } from 'lucide-react';
import { Button, Card } from '../components/ui';
import { useFamily } from '../context/FamilyContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { familyData, resetData } = useFamily();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to reset your family data? This action is permanent.')) {
      resetData();
      navigate('/');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Family Dashboard</h1>
          <p className="text-google-grey flex items-center gap-2 mt-1">
            <ShieldCheck size={16} className="text-google-green" />
            Monitoring Active • {familyData.headName}'s Family
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/qrs')}>
            <QrCode size={18} className="mr-2" /> View QRs
          </Button>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut size={18} className="text-google-red" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Safe Point Info */}
        <Card className="lg:col-span-1 border-t-4 border-t-google-green h-fit">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 text-google-green rounded-lg">
              <MapPin size={24} />
            </div>
            <h3 className="font-bold">Meeting Point</h3>
          </div>
          <p className="text-lg font-medium text-gray-900 mb-2">{familyData.meetingPoint}</p>
          <p className="text-sm text-google-grey">
            Rescue teams will escort members here upon scanning their QR code.
          </p>
        </Card>

        {/* Member Status List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2 mb-2">
            <h3 className="font-bold text-gray-900">Family Members</h3>
            <span className="text-sm text-google-grey">{familyData.members.length} Total</span>
          </div>
          
          {familyData.members.map((member) => (
            <Card key={member.id} className="flex items-center justify-between hover:border-google-blue transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${member.status === 'Missing' ? 'bg-google-red' : 'bg-google-blue'}`}>
                  <User size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{member.name}</h4>
                  <p className="text-sm text-google-grey">{member.relation} • {member.age} yrs</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  member.status === 'Safe' ? 'bg-green-100 text-google-green' : 'bg-red-100 text-google-red'
                }`}>
                  {member.status}
                </span>
              </div>
            </Card>
          ))}

          {/* Rescue Simulation Helper */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mt-12">
            <div className="flex items-start gap-4">
              <Search size={24} className="text-google-blue mt-1" />
              <div>
                <h4 className="font-bold text-google-blue mb-1">Testing the System?</h4>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Go to the <b>View QRs</b> screen. You can scan these codes with any QR reader to see how a rescuer would view your family's profile and safe location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
