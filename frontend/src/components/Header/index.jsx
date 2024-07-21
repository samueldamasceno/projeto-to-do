import './style.css'
import { Link } from 'react-router-dom';

function Header() {
    return(
        <header>
            <div></div>

            <Link to='/'>
            <h4 className='titulo'>lista de tarefas</h4>
            </Link>

            <div className='btn-container'>
                <Link to="/login"><button className='btn-login'>login</button></Link>
                <Link to="/cadastro"><button className='btn-cad'>cadastro</button></Link>
            </div>
        </header>
    )
}

export default Header;