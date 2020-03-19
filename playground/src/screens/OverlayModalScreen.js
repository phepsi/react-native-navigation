const { View } = require('react-native');
const concat = require('lodash/concat');
const React = require('react');
const Button = require('../components/Button')
const Navigation = require('./../services/Navigation');
const Screens = require('./Screens');
const {
  MODAL_BTN,
  DISMISS_MODAL_BTN,
} = require('../testIDs');

class OverlayModalScreen extends React.Component {
  static options() {
    return {
      modalPresentationStyle: 'overCurrentContext',
      layout: { componentBackgroundColor: 'transparent', backgroundColor: 'transparent' },
    };
  }

  state = {
    dimissCounter: 0,
  }

  componentDidMount() {
    Navigation.events().bindComponent(this);
  }

  modalAttemptedToDismiss() {
    return this.setState(state => ({ dimissCounter: state.dimissCounter + 1 }))
  }

  render() {
    return (
      <>
        <View style={{ flex: 1 }} />
        <View style={{ backgroundColor: '#555', width: '100%', height: '50%', padding: 20 }}>
          <Button label='Show Modal' testID={MODAL_BTN} onPress={this.showModal} />
          <Button label='Dismiss Modal' testID={DISMISS_MODAL_BTN} onPress={this.dismissModal} />
        </View>
      </>
    );
  }

  showModal = () => {
    Navigation.showModal({
      component: {
        name: Screens.Modal,
        passProps: {
          modalPosition: this.getModalPosition() + 1,
          previousModalIds: concat([], this.props.previousModalIds || [], this.props.componentId)
        }
      }
    });
  }

  dismissModal = async () => await Navigation.dismissModal(this.props.componentId);

  getModalPosition = () => this.props.modalPosition || 1;

  getPreviousModalId = () => last(this.props.previousModalIds);
}
module.exports = OverlayModalScreen;
