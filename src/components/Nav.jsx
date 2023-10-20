import { useNavigate } from "react-router-dom";

const Nav = (props) => {
    const { user } = props;

    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem("_id");
        alert("User signed out!");
        navigate(("/"));
    };
    return (
        <nav className='navBar'>
            <div className='navBarRight'>
                <h2>Welcome, {user.username || "Guest"}</h2>
                <button className='btn' onClick={signOut}>Sign out</button>
            </div>
        </nav>
    );
};

Nav.propTypes = {
    user: {}
  }

export default Nav;