import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { LogoutAction } from '../redux/actions';
import {MdShoppingCart} from 'react-icons/md'
import {FaUserAstronaut,FaUserGraduate} from 'react-icons/fa'

const onBtnLogoutClick = () =>{
  localStorage.removeItem('febry123#')
  this.props.LogoutAction()
}

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="info" light expand="md">
        <NavbarBrand href="/">
          <span><img src="http://2.bp.blogspot.com/-66rTPz3I0jc/VCzFkh0GyKI/AAAAAAAAAvU/7E9UyGdCeJc/s1600/Layar%2BTancap%2Blogo.png" alt="logo" style={{width:'50px'}}/></span>
          <span><img src="https://4.bp.blogspot.com/-QdC1xa_mOZA/XTlSr8_1JfI/AAAAAAAADCs/M6l6V6A6FxEhf0ru219_XzA4FmvRd9NHACK4BGAYYCw/s1600/logo%2Bbenar%2Blayar%2Btancap.png" alt="logo" style={{width:'200px'}}/></span>
         </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          <NavItem>
  <NavLink href={'/Cart'}><MdShoppingCart style={{color:'yellow',fontSize:'28'}}/>{props.cart}</NavLink>
          </NavItem> 
          {props.namauser === '' ?
          <NavItem>
            <NavLink href={'/Login'} className='ml-5' style={{color:'yellow',fontWeight:'bold'}}>Login</NavLink>
          </NavItem> 
          :null
        }

        {props.namauser === '' ? 
        null : props.role === 'admin' ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                 Hi, {props.namauser}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to={'/ChangePassword'} style={{textDecoration:'none',color:'lightseagreen'}}>Change Password</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to={'/ManageAdmin'} style={{textDecoration:'none',color:'lightseagreen'}}>Manage Admin</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to={'/ManageStudio'} style={{textDecoration:'none',color:'lightseagreen'}}>Manage Studio</Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={onBtnLogoutClick} href={'/'} style={{textDecoration:'none',color:'lightseagreen'}}>
                     Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
          ) 
          :
          props.role === 'user' ? (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret style={{color:'yellow',fontSize:'28'}}><FaUserAstronaut className='mr-2'/>
                 Hi, {props.namauser}
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                      History
                    </DropdownItem>
                    <DropdownItem>
                      <Link to={'/ChangePassword'} style={{textDecoration:'none',color:'lightseagreen'}}>Change Password</Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={onBtnLogoutClick} href={'/'} style={{textDecoration:'none',color:'lightseagreen'}}>
                      Logout
                    </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
          )
          :null
        } 
        </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

const MapStateToProps=(state)=>{
  return{
    namauser:state.Auth.username,
    role:state.Auth.role,
    cart:state.Auth.cart
  }
}

export default connect(MapStateToProps, {LogoutAction}) (Header);