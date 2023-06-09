import Link from "next/link";
import { ConnectButton } from "web3uikit";
export default function Header(){
    return <nav className="navbar navbar-expand-lg navbar-light bg1">
    <a className="navbar-brand text-light mx-5 my-3" href="/">D-Lancer</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
      <ul className="navbar-nav">
        <li className="nav-item ml-5">
          <Link className="nav-link text-light" href={'/search'}>Search </Link>
        </li> 
        <li className="nav-item ml-5">
          <Link className="nav-link text-light" href={'/users'}>Users </Link>
        </li>
        <li className="nav-item ml-5">
          <Link className="nav-link text-light" href={'/projects'}>Projects</Link>
        </li>
        <li className="nav-item ml-5">
          <Link className="nav-link text-light" href={'/requests'}>Requests</Link>
        </li>
      </ul>
      <div >
        <ConnectButton/>
      </div>
    </div>
  </nav>
}