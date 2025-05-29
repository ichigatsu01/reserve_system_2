import { Box, Stack } from '@mui/material'
import './Header.css'
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/logo.png';

const Header = () => {
    return (
        <>
            <Stack sx={{display:{xs: 'none', sm: 'block'}}}>
                <header id="header">
                    <Box sx={{ width: 150, height: 'auto'  }}>
                        <img src={logo} alt="ささみまぐろペットクリニック" style={{ width: '100%', height: 'auto' }} />
                    </Box>
                    <div id="navi">
                        <ul>
                            <li>HOME</li>
                            <li>診療について</li>
                            <li>よくある質問</li>
                            <li>医師の紹介</li>
                            <li>受診の仕方</li>
                            <li id="reserve">Web順番予約</li>
                            <li>アクセス</li>
                            <li>お知らせ</li>
                        </ul>
                    </div>
                </header>
            </Stack>
            <Stack spacing={2} direction={'row'} sx={{
                mx:0, my:0, padding:'10px', bgcolor:"#79A1D4", textAlign:'center', alignItems:'center',
                display:{xs: 'flex', sm: 'none'}, justifyContent:'space-between'
                }}>
                <Box sx={{ width: 150, height: 'auto'  }}>
                    <img src={logo} alt="ささみまぐろペットクリニック" style={{ width: '100%', height: 'auto' }} />
                </Box>
                <Box sx={{marginRight: '20px'}}>
                    <MenuIcon fontSize='large' />    
                </Box>
            </Stack>
        </>
    )
}

export default Header