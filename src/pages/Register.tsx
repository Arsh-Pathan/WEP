import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, ArrowRight, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Button, Input, Card } from '../components/ui';
import { useFamily } from '../context/FamilyContext';

const Register = () => {
  const navigate = useNavigate();
  const { registerFamily } = useFamily();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    headName: '',
    contact: '',
    meetingPoint: '',
    members: [{ name: '', age: '', relation: '' }],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...formData.members];
    (updatedMembers[index] as any)[field] = value;
    setFormData((prev) => ({ ...prev, members: updatedMembers }));
  };

  const addMember = () => {
    setFormData((prev) => ({
      ...prev,
      members: [...prev.members, { name: '', age: '', relation: '' }],
    }));
  };

  const removeMember = (index: number) => {
    if (formData.members.length > 1) {
      setFormData((prev) => ({
        ...prev,
        members: prev.members.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      registerFamily(formData);
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Family Registration</h2>
        <p className="text-google-grey">Step {step} of 2</p>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-semibold mb-6">Family Details</h3>
            <Input
              label="Family Head Name"
              id="headName"
              placeholder="e.g. John Doe"
              icon={User}
              required
              value={formData.headName}
              onChange={handleInputChange}
            />
            <Input
              label="Emergency Contact Number"
              id="contact"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              icon={Phone}
              required
              value={formData.contact}
              onChange={handleInputChange}
            />
            <Input
              label="Safe Meeting Point"
              id="meetingPoint"
              placeholder="e.g. Relief Camp Alpha, Block 4"
              icon={MapPin}
              required
              value={formData.meetingPoint}
              onChange={handleInputChange}
            />
            <div className="mt-8 flex justify-end">
              <Button type="submit">
                Next <ArrowRight className="inline ml-2" size={16} />
              </Button>
            </div>
          </Card>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-semibold mb-4 px-2">Family Members</h3>
            {formData.members.map((member, index) => (
              <Card key={index} className="relative">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-google-blue">Member {index + 1}</span>
                  {formData.members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="text-google-red p-1 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
                <Input
                  placeholder="Full Name"
                  id={`name-${index}`}
                  value={member.name}
                  onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Age"
                    type="number"
                    value={member.age}
                    onChange={(e) => handleMemberChange(index, 'age', e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Relation"
                    value={member.relation}
                    onChange={(e) => handleMemberChange(index, 'relation', e.target.value)}
                    required
                  />
                </div>
              </Card>
            ))}
            
            <Button
              variant="outline"
              onClick={addMember}
              className="w-full border-dashed border-2 py-4"
            >
              <Plus className="inline mr-2" size={18} /> Add Another Member
            </Button>

            <div className="mt-12 flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200 sticky bottom-6 shadow-lg">
              <Button variant="ghost" onClick={() => setStep(1)}>
                <ArrowLeft className="inline mr-2" size={16} /> Back
              </Button>
              <Button type="submit">
                Complete Registration
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
