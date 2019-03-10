import { combineReducers } from "redux";
import schedule from "./schedule";
import params from "./params";
import settings from "./settings";

export default combineReducers({ schedule, params, settings });
