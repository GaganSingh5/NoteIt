import  { useLocation, Navigate, Outlet} from 'react-router-dom';
import useAuth from '../../hooks/userAuth';


const RequireAuth = ()=> {
  const { auth }: any = useAuth();
  const location = useLocation();
  
  return(auth?.userId? <Outlet/>:<Navigate to='/' state={{from: location}} replace />)

};


export default RequireAuth;