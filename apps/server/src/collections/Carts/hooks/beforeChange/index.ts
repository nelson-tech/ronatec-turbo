import updateCountHook from './updateCount'
import updateLastEdit from './updateLastEdit'

const beforeChange = [updateCountHook, updateLastEdit]

export default beforeChange
