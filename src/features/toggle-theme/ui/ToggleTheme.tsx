import { Button } from '@/shared/ui';
import styles from './ToggleTheme.module.scss';
import { observer } from 'mobx-react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { useTheme } from '@/app/providers';

export const ToggleTheme = observer(function ToggleTheme() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button onClick={toggleTheme} className={styles['toggle-theme-button']}>
      {theme === 'dark' ? <IoMdSunny /> : <IoMdMoon />}
    </Button>
  )
})
