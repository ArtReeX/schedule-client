import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, ScrollView } from "react-native";
import CHeader from "./Header";
import CInfo from "./Info";
import CSetting from "./Setting";
import { getSchedule } from "../services/requests";

class CContent extends React.Component {
  constructor(props) {
    super(props);

    this.updateSchedule = this.updateSchedule.bind(this);
  }
  updateSchedule() {
    const { date, groupId } = this.props.store.settings;
    const { enableLoader, disableLoader, updateSchedule } = this.props;

    enableLoader();
    getSchedule(date, groupId)
      .then(({ data: { lessons } }) => {
        updateSchedule(lessons);
        disableLoader();
      })
      .catch(enableLoader());
  }

  render() {
    return (
      <View>
        <CHeader updateSchedule={this.updateSchedule} />
        <ScrollView>
          <CSetting updateSchedule={this.updateSchedule} />
          <CInfo updateSchedule={this.updateSchedule} />
        </ScrollView>
      </View>
    );
  }
}

CContent.propTypes = {
  enableLoader: PropTypes.func.isRequired,
  disableLoader: PropTypes.func.isRequired,
  updateSchedule: PropTypes.func.isRequired,
  store: PropTypes.shape({
    setting: PropTypes.shape({
      date: PropTypes.string.isRequired,
      groupId: PropTypes.string.isRequired
    }),
    shedule: PropTypes.arrayOf({
      id: PropTypes.number,
      subject: PropTypes.shape({
        name: PropTypes.string,
        teacherName: PropTypes.string
      }),
      beginTime: PropTypes.string,
      endTime: PropTypes.string
    })
  })
};

export default connect(
  state => ({ store: state }),
  dispatchEvent => ({
    enableLoader: () => {
      dispatchEvent({ type: "ENABLE_LOADER" });
    },
    disableLoader: () => {
      dispatchEvent({ type: "DISABLE_LOADER" });
    },
    updateSchedule: lessons => {
      dispatchEvent({ type: "UPDATE_SCHEDULE", lessons });
    }
  })
)(CContent);
