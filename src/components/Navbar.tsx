import logo from '@components/images/logo.png';
import {
  switchLanguage
} from '@redux/actions/app';
import {
  useStatus
} from '@utils/custom-hook';
import globalEvents from '@utils/global-events';
import Link from 'next/link';
import {
  useRouter
} from 'next/router';
import React, {
  memo, useEffect, useRef
} from 'react';
import {
  useDispatch
} from 'react-redux';

interface ItemIn {
  path?: string;
  label: string | JSX.Element;
}

interface NavbarIn {
  items: ItemIn[];
}

const initialState = {
  bgNavbar: 'clean-navbar',
  screenWidth: 1337
};

const Navbar = ({items}: NavbarIn) => {
  const [state, setState] = useStatus(initialState);
  const dispatch = useDispatch();
  const navBar = useRef(null);
  const router = useRouter();

  const {bgNavbar} = state;

  useEffect(() => {
    if (window && window.scrollY > 31)
      setState({bgNavbar: ''});

    if (window && window.innerWidth)
      setState({screenWidth: window.innerWidth});

    if (navBar.current) {
      const items = navBar.current.querySelectorAll('a.nav-item');

      for (const i of items) {
        const itemRef = i.getAttribute('href');

        if (itemRef === router.pathname)
          i.classList.add('primary-selected');

        i.onclick = e => {
          const target: HTMLElement = e.target;

          items.forEach(j => j.classList.remove('primary-selected'));
          target.classList.add('primary-selected');
        };
      }
    }

    globalEvents.addResizeHandle(handleResize);
    globalEvents.addScrollHandle(handleScroll);
  }, []);

  const handleResize = (size: number) => {
    console.log(size);
  };

  const handleScroll = (scrolled: number) => {
    console.log(scrolled);
    if (scrolled < 31)
      setState({bgNavbar: 'clean-navbar'});
    else
      setState({bgNavbar: ''});
  };

  const switcherLang = (value) => {
    console.log(value);
    dispatch(switchLanguage(value));
  };

  return <>
    <nav className={`navbar-component ${bgNavbar}`}>
      <div className="navbar-container" ref={navBar}>
        <ul className="navbar-left">
          <li>
            <Link href="/">
              <a href="/" className="nav-item">
                <img src={logo} alt='logo' height='100%' />
              </a>
            </Link>
          </li>
        </ul>
        <ul className="navbar-right">
          {items.map((item, i) => item.path
            ? <li key={i}>
              <Link href={item.path}>
                <a href={item.path} className="nav-item">
                  {item.label}
                </a>
              </Link>
            </li>
            : <li key={i} className="nav-item">
              {item.label}
            </li>)
          }
        </ul>
      </div>
    </nav>
  </>;
};

export default memo(Navbar, (prev, next) => {
  console.log(prev, next);

  return true;
});
