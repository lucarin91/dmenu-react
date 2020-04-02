import * as React from 'react'
import styles from './styles.module.css'
import 'font-awesome/css/font-awesome.min.css';

interface MenuItems {
  name: string,
  url: string,
  id: number
}

interface DmenuProps {
  menu: MenuItems[]
  active: number;
}

interface DmenuState {
  menu: MenuItems[],
  filteredMenu: MenuItems[],
  input: string,
  selected: number,
  isMenuClicked: boolean
}

// based on: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_topnav
// TODO: implement the responsive part

export class DMenu extends React.Component<DmenuProps, DmenuState> {
  inputRef: HTMLInputElement;

  constructor(props: DmenuProps) {
    super(props)
    let menu = this.props.menu.map((value, index) => ({ ...value, id: index }))
    this.state = {
      menu: menu,
      filteredMenu: menu,
      input: "",
      selected: 0,
      isMenuClicked: false
    }
  }

  render() {
    return <form className={styles.topnav + " " + (this.state.isMenuClicked ? styles.responsive : "")} onSubmit={e => this.handleSubmit(e)}>
      <input className={styles.input}
        type="text"
        ref={input => { if (input) this.inputRef = input }}
        value={this.state.input}
        onChange={e => this.handleInput(e)}
        onBlur={_e => { setTimeout(() => this.inputRef.focus(), 0) }}
        autoFocus />
      <MenuItemsComp menu={this.state.filteredMenu}
        active={this.props.active}
        selected={this.state.selected} />
      <a className={styles.icon} onClick={e => { this.handlerMenuClick(e) }}>
        <i className="fa fa-bars"></i>
      </a>
    </form>
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ input: event.target.value, selected: 0, filteredMenu: this.getfilterMenu(event.target.value) })
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key == "ArrowRight" && this.state.selected < this.state.filteredMenu.length - 1) {
      this.setState({ selected: this.state.selected + 1 })
      event.preventDefault();
    } else if (event.key == "ArrowLeft" && this.state.selected > 0) {
      this.setState({ selected: this.state.selected - 1 })
      event.preventDefault();
    }
    if (event.key == "ArrowRight" || event.key == "ArrowLeft") {
      event.preventDefault();
    }
  }

  handlerMenuClick(_event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    console.log(event?.target);
    this.setState(state => ({ isMenuClicked: !state.isMenuClicked }))
  }

  clearInput() {
    this.setState(state => ({ input: "", selected: 0, filteredMenu: state.menu }))
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    let nextUrl = this.state.filteredMenu[this.state.selected].url;
    this.clearInput();
    window.location.href = nextUrl;
    event.preventDefault();
  }

  getfilterMenu(input: string) {
    return this.state.menu.filter(item => item.name.toLowerCase().includes(input))
      .sort((a, b) => ('' + a.name).localeCompare(b.name))
  }
}

interface MenuItemsCompProps {
  active: number,
  selected: number,
  menu: MenuItems[]
}

interface MenuItemsCompState {
  mouseOver: boolean
}

class MenuItemsComp extends React.Component<MenuItemsCompProps, MenuItemsCompState> {
  public readonly state = {
    mouseOver: false
  }

  render() {
    return <div onMouseEnter={e => this.onMouseEnter(e)} onMouseLeave={e => this.onMouseLeave(e)}>{this.props.menu.map((value, index) => {
      return <a key={value.id} className={this.getClassName(value, index)} href={value.url}>
        {value.name}
      </a>
    })}
    </div>
  }

  onMouseEnter(_event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    this.setState({ mouseOver: true })
  }

  onMouseLeave(_event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    this.setState({ mouseOver: false })
  }

  getClassName(value: MenuItems, index: number) {
    return [(value.id == this.props.active ? styles.active : ""),
    (index == this.props.selected && !this.state.mouseOver ? styles.selected : "")]
      .join(" ")
  }
}