import classes from './header.module.css';

const Header = ({ session, onLogout }) => {
  return (
    <header className={classes.header}>
      <div>{session.user.email}</div>
      {session && <button onClick={onLogout}>Выйти</button>}
    </header>
  );
};

export default Header;
