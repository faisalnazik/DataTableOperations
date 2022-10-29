// components
import SvgIconStyle from '../../../components/SvgIconStyle'

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />

const ICONS = {
  analytics: getIcon('ic_analytics')
}

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'v1.0',
    items: [{ title: 'Tables', path: '/', icon: ICONS.analytics }]
  }
]

export default navConfig
