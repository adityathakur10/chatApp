import {useState} from 'react'
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';

const SignupPage=()=>{
    const [inputs,setInputs]=useState({
        name:"",
        email:"",
        password:""
    });
    const {signup,loading,error}=useSignup()
    const handleSubmit=async(e)=>{
        e.preventDefault();
        await signup(inputs);
    }

    return (
        <div className='flex items-center justify-center bg-surface min-h-screen'>
            <div className='w-full max-w-md p-8 bg-surface-2 rounded-2xl shadow-md border border-muted'>
                <h1 className='text-2xl font-bold text-center text-ink'>Create an Account</h1>
                <form className='space-y-6' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className='text-sm font-medium text-ink/70'>Name</label>
                        <input 
                            type="text" 
                            id='name' 
                            className='w-full px-3 py-2 border border-muted rounded-md shadow-sm bg-surface-2 text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand' 
                            value={inputs.name}
                            onChange={(e)=> setInputs({...inputs,name:e.target.value})}    
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className='text-sm font-medium text-ink/70'>Email</label>
                        <input 
                            type="email" 
                            id='email' 
                            className='w-full px-3 py-2 border border-muted rounded-md shadow-sm bg-surface-2 text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand' 
                            value={inputs.email}
                            onChange={(e)=> setInputs({...inputs,email:e.target.value})}    
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className='text-sm font-medium text-ink/70'>Password</label>
                        <input 
                            type="password" 
                            id='password' 
                            className='w-full px-3 py-2 border border-muted rounded-md shadow-sm bg-surface-2 text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand' 
                            value={inputs.password}
                            onChange={(e)=> setInputs({...inputs,password:e.target.value})}    
                        />
                    </div>
                    {error && <div className='p-3 text-sm font-medium bg-red-100 text-red-700 border border-red-400 rounded-md'>{error}</div>}
                    
                    <div>
                        <button 
                            type='submit' 
                            className='w-full px-4 py-2 font-medium text-white bg-brand rounded-md hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:opacity-70'
                            disabled={loading}>
                            {loading ?"Signing Up..." :"Sign Up"}
                        </button>
                    </div>
                </form>
                <p className='text-sm text-center text-ink/70'>
                    Already have an account?{' '}
                    <Link to="/login" className='font-medium text-brand hover:brightness-95'>Log In</Link>
                </p>
            </div>

        </div>
    )
};
export default SignupPage;
