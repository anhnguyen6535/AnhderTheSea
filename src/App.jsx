import "./App.css";
import Fish from "./Fish";
import { FishTank } from "./FishTank";

export default function App() {
    return(
        <div className="scene">
            <div className="scene__feeder">
                Feeder
            </div>
            <div className="scene__tank">
                <FishTank/>
            </div>
        </div>
    )
}