import { combineReducers } from "redux";
import schedule from "./schedule";
import settings from "./settings";
import face from "./face";

export default combineReducers({ schedule, settings, face });
