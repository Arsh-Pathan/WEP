import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, Printer, Info, Shirt, Pencil, Globe } from 'lucide-react';
import { Button, Card, Input } from '../components/ui';
import { useFamily } from '../context/FamilyContext';

const QRCodes = () => {
  const navigate = useNavigate();
  const { familyData } = useFamily();
  const [baseUrl, setBaseUrl] = useState(window.location.origin);

  useEffect(() => {
    // Attempt to auto-detect if the user is on a custom host
    setBaseUrl(window.location.origin);
  }, []);

  if (!familyData) return null;

  const printQRs = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <div className="flex items-center justify-between mb-10 print:hidden">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Family QR IDs</h1>
        </div>
        <Button variant="outline" onClick={printQRs}>
          <Printer size={18} className="mr-2" /> Print All
        </Button>
      </div>

      {/* Hostname Helper for Mobile Testing */}
      <Card className="mb-6 border-google-yellow bg-yellow-50 print:hidden">
        <div className="flex gap-4 items-start">
          <Globe className="text-google-yellow shrink-0 mt-1" size={24} />
          <div className="w-full">
            <h3 className="font-bold text-yellow-800 mb-1">Testing on Mobile?</h3>
            <p className="text-xs text-yellow-700 mb-4 leading-relaxed">
              If you are scanning with a phone, ensure the URL below matches your computer's <b>Network IP</b> (e.g., http://192.168.1.5:5173).
            </p>
            <Input 
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="http://YOUR-IP:5173"
              className="bg-white border-google-yellow/30 text-xs"
            />
          </div>
        </div>
      </Card>

      {/* Instructions Card */}
      <Card className="mb-12 bg-blue-50 border-blue-200 print:hidden">
        <div className="flex gap-4">
          <Info className="text-google-blue shrink-0" size={24} />
          <div>
            <h3 className="font-bold text-google-blue mb-2">How to use these IDs</h3>
            <p className="text-sm text-blue-800 mb-4 leading-relaxed">
              In war or disaster situations, physical identification is vital. Choose a method below for your family members:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-white/50 p-3 rounded-md border border-blue-100">
                <Shirt className="text-google-blue shrink-0" size={18} />
                <span className="text-xs text-blue-900 font-medium">Print and sew these into the inner lining of clothing.</span>
              </div>
              <div className="flex items-start gap-3 bg-white/50 p-3 rounded-md border border-blue-100">
                <Pencil className="text-google-blue shrink-0" size={18} />
                <span className="text-xs text-blue-900 font-medium">For children, draw the code on their forearm using a permanent marker.</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* QR Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {familyData.members.map((member) => (
          <Card key={member.id} className="flex flex-col items-center p-8 text-center break-inside-avoid">
            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
            <p className="text-sm text-google-grey mb-6 uppercase tracking-widest">{member.relation}</p>
            
            <div className="p-4 bg-white border-2 border-gray-100 rounded-xl mb-6 shadow-inner">
              <QRCodeSVG 
                value={`${baseUrl}/profile/${member.id}?d=${btoa(JSON.stringify({
                  n: member.name,
                  a: member.age,
                  r: member.relation,
                  m: familyData.meetingPoint,
                  h: familyData.headName,
                  c: familyData.contact
                }))}`}
                size={180}
                level="L"
                includeMargin={true}
              />
            </div>

            <p className="text-[10px] font-mono text-gray-400 mb-4">
              WEP-ID: {member.id}
            </p>

            <div className="w-full pt-6 border-t border-gray-100">
              <p className="text-xs text-google-grey font-medium mb-1">REUNIFICATION POINT</p>
              <p className="text-sm font-bold text-gray-900">{familyData.meetingPoint}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center text-google-grey text-xs hidden print:block">
        Generated by War Emergency Portal (WEP) • Stay Safe.
      </div>
    </div>
  );
};

export default QRCodes;
