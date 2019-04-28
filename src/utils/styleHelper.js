import { DarkShadow } from 'theme/custom/shadow'
import Palette from 'theme/custom/palette'

const styleHelper = {
    createLineClamp: (line = 10) => ({
        display: '-webkit-box',
        WebkitLineClamp: line,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        wordBreak: 'break-word',
    }),
}

export default styleHelper
