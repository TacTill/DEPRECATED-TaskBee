function CONTROLLER() {
  return {
    run : (objectName) => (processName) => RUNTREE(EN_txt)[objectName].process[processName].RUN(),
    getAllAvailableObjectsFromRuntree: (runtime) => Object.keys(runtime),
    getAllAvailableProcessFromRuntreeObject: (runtimeObject) => Object.keys(runtimeObject.process)
  }
}