import chef from "../images/chef-claude-icon.png"
export default function Header (){
    return(
        <header className="header">
            <nav>
                <img src={chef} alt="chef-icon"/>
                <span>Chef Claude</span>
            </nav>
            

        </header>
    );
}