import { useDispatch, useSelector } from 'react-redux'
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { selectLanguages, selectSelectedLanguage } from '../../../../../store/selectors'
import { setLanguage } from '../../../../../store/metaSlice'

const LanguageSelect = () => {
	const languages = useSelector(selectLanguages)
	const selectedLanguage = useSelector(selectSelectedLanguage)

	const dispatch = useDispatch();

	const handleChange = (event) => {
		dispatch(setLanguage(event.target.value));
	}

	if (!languages) return null;

	return (
		<FormControl className="language-dropdown" variant="outlined" size="small">
			<InputLabel id="language-select-label">Language</InputLabel>
			<Select
				labelId="language-select-label"
				id="language-select"
				value={selectedLanguage}
				onChange={handleChange}
				label="Language"
			>
				{languages.map((lang) => (
					<MenuItem key={lang.iso} value={lang.iso}>
						{lang.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default LanguageSelect
