import {isObjEmpty} from "../Utils";

export const generateSelectDefinition = (definition = {}) => {
    const defaultDefinition = {id: 'id', newId: 'value', name: 'name', newName: 'label'}

    if (typeof definition === 'object' && !isObjEmpty(definition)) {
        return {...defaultDefinition, ...definition};
    }

    return defaultDefinition;
}

export const castOption = (option, definitions = {id: 'id', newId: 'value', name: 'name', newName: 'label'}) => {
    const tmpOption = {...option}

    definitions = {...generateSelectDefinition(definitions)}

    if (option[definitions.newId] === undefined && option[definitions.id] !== undefined) {
        tmpOption[definitions.newId] = tmpOption[definitions.id]
        delete tmpOption[definitions.id]
    }

    if (option[definitions.newName] === undefined && option[definitions.name] !== undefined) {
        tmpOption[definitions.newName] = option[definitions.name]
        delete tmpOption[definitions.name]
    }

    return tmpOption;
}

export const castOptions = (options, definition = {id: 'id', newId: 'value', name: 'name', newName: 'label'}) => {
    return options.map((option) => castOption(option, definition))
}

export const getMenuValue = (option) => {
    return option.value === undefined ? option.id : option.value
}

export const getMenuValues = (options) => {
    return options.map((option) => (getMenuValue(option)));
}