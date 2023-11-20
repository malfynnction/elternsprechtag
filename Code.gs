const DUMMY_VERTEX = null

const source = SpreadsheetApp.getActive().getSheetByName('Form responses 1')
const target = SpreadsheetApp.getActive().getSheetByName('Schedule')

const index = () => {
  const data = source.getDataRange().getDisplayValues()
  const rows = data.slice(1)

  const availabilities = getAvailabilities(rows)
  const matches = hopcroftKarp(availabilities)

  const result = Object.keys(matches).reduce((array, name) => {
    return [...array, [name, matches[name]]]
  }, [])

  target.getRange(2, 1, rows.length, 2).setValues(result)
}

const getAvailabilities = (rows) => {
  return rows.reduce((obj, row) => {
    const name = row[1]
    const availabilities = row[2].replaceAll(' ', '').split(',')

    return { ...obj, [name]: availabilities }
  }, {})
}

const reflect = (array) => {
  return array.reduce((obj, value) => ({ ...obj, [value]: value }), {})
}

const createMatrix = (graph) => {
  return Object.keys(graph).reduce(
    (obj, name) => ({
      ...obj,
      [name]: reflect(graph[name]),
    }),
    {}
  )
}

const partitionMatrix = (matrix) => {
  return {
    names: reflect(Object.keys(matrix)),
    times: reflect(
      Object.keys(matrix)
        .reduce((array, name) => [...array, ...Object.keys(matrix[name])], [])
        .filter((v, i, array) => array.indexOf(v) === i)
    ),
  }
}

function defaultMatch(partition) {
  return {
    names: Object.keys(partition.names).reduce(
      (obj, name) => ({ ...obj, [name]: DUMMY_VERTEX }),
      {}
    ),
    times: Object.keys(partition.times).reduce(
      (obj, time) => ({ ...obj, [time]: DUMMY_VERTEX }),
      {}
    ),
  }
}

const hopcroftKarp = (availabilities) => {
  const distance = {}
  const adjacency = createMatrix(availabilities)
  const partition = partitionMatrix(adjacency)
  const matches = defaultMatch(partition)

  const breadthFirstSearch = () => {
    const queue = []

    for (const name in partition.names) {
      if (name && matches.names[name] === DUMMY_VERTEX) {
        distance[name] = 0
        queue.push(name)
      } else {
        distance[name] = Infinity
      }
    }

    distance[DUMMY_VERTEX] = Infinity

    while (queue.length > 0) {
      const name = queue.shift()
      if (distance[name] < distance[DUMMY_VERTEX]) {
        for (const time in adjacency[name]) {
          if (
            adjacency[name].hasOwnProperty(time) &&
            distance[matches.times[time]] === Infinity
          ) {
            distance[matches.times[time]] = distance[name] + 1
            queue.push(matches.times[time])
          }
        }
      }
    }

    return distance[DUMMY_VERTEX] !== Infinity
  }

  const depthFirstSearch = (name) => {
    if (name === DUMMY_VERTEX) {
      return true
    }

    for (const time in adjacency[name]) {
      if (
        time &&
        distance[matches.times[time]] === distance[name] + 1 &&
        depthFirstSearch(matches.times[time])
      ) {
        matches.times[time] = name
        matches.names[name] = time
        return true
      }
    }

    distance[name] = Infinity
    return false
  }

  while (breadthFirstSearch()) {
    for (const name in partition.names) {
      if (name && matches.names[name] === DUMMY_VERTEX) {
        depthFirstSearch(name)
      }
    }
  }

  return matches.names
}
