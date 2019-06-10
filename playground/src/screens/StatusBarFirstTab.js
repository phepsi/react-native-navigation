const React = require('react');
const { StyleSheet, Image } = require('react-native');
const Root = require('../components/Root');
const Button = require('../components/Button')
const Navigation = require('../services/Navigation');
const Screens = require('./Screens');

class StatusBarFirstTab extends React.Component {
  visible = true;

  static options() {
    return ({
      statusBar: {
        translucent: true,
        drawBehind: true
      },
      topBar: {
        elevation: 0,
        drawBehind: true,
        background: {
          color: 'transparent'
        },
        title: {
          text: 'Pushed'
        }
      }
    });
  }

  render() {
    return (
      <Root componentId={this.props.componentId} style={style.root}>
        <Image
          style={style.image}
          source={require('../../img/city2.jpeg')}
          fadeDuration={0}
        />
        <Button label='Push' onPress={this.push} />
        <Button label='Toggle Tabs' onPress={this.toggleTabs} />
      </Root>
    );
  }

  push = () => Navigation.push(this, Screens.Pushed, {
    bottomTabs: {
      visible: false,
      drawBehind: true
    }
  });

  toggleTabs = () => {
    this.visible = !this.visible
    Navigation.mergeOptions(this, {
      bottomTabs: {
        visible: this.visible,
        drawBehind: !this.visible
      }
    });
  };
}

const style = StyleSheet.create({
  root: {
    paddingTop: 0,
    paddingHorizontal: 0
  },
  image: {
    height: 250,
    width: '100%',
    resizeMode: 'cover',
    marginBottom: 16
  }
});

module.exports = StatusBarFirstTab;