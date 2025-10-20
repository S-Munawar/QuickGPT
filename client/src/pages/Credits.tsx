import { useEffect } from 'react'
import {useState} from 'react'
import Loading from './Loading';
import type { Plan } from '../types';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Credits = () => {

  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const {token, axios} = useAppContext();

  const fetchPlans = async () => {
    try{
      const {data} = await axios.get('/api/credits/plans', { headers: { Authorization: token } });
      if (data.success) setPlans(data.plans);
      else {
        toast.error('Failed to fetch credit plans',  data.message);
      }
    }
    catch (error) {
      toast.error(`Error fetching credit plans: ${String(error)}`);
    }
      setLoading(false);
  }

  const purchasePlan = async (planId: string) => {
    
    try{
      const {data} = await axios.post('/api/credits/purchase', { planId }, { headers: { Authorization: token } });
      if (data.success) window.location.href = data.url;
      else toast.error('Failed to initiate purchase', data.message);
    }
    catch (error) {
      toast.error(`Error purchasing plan: ${String(error)}`);
    }
  }

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className='max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6'>
      <h2 className='text-3xl font-semibold text-center mb-10 mt-30 text-gray-800 dark:text-white'>Credit Plans</h2>
      <div className='flex flex-wrap justify-center gap-8'>
        {plans.map((plan) => (
          <div className="border border-gray-200 dark:border-purple-700 rounded-lg shadow hover:shadow-lg transition-shadow p-6 min-w-[300px] flex flex-col bg-white dark:bg-transparent">
              <div className='flex-1'>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>{plan.name}</h3>
                <p className='text-2xl font-bold text-purple-600 dark: text-purple-300 mb-4'>${plan.price}
                <span className='text-base font-normal text-gray-600'>{' '}/{plan.credits}</span>
                </p>
                <ul>
                  {plan.features.map((feature, index) => (
                    <li key={index} className='text-gray-700 dark:text-purple-200 mb-2 flex items-center'>
                      <span className='text-green-500 mr-2'>✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => toast.promise(purchasePlan(plan._id), {
                loading: 'Processing...',
              })} className='mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition-colors'>
                Purchase
              </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Credits
