
export const omit = (key: any, obj: any) => {
    return (key: any, {[key]: _, ...obj}: any) => obj
}