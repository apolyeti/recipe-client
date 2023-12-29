import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { IconButton } from '@mui/material'


interface SearchButtonProps {
    handleSearch: () => void;
    disabled: boolean;
}

export default function SearchButton(props: SearchButtonProps) {
    return (
        <IconButton
            onClick={props.handleSearch}
        >
            <AutoAwesomeOutlinedIcon className='searchbutton'/>
        </IconButton>
    )
}