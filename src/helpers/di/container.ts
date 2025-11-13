class Container {
  private services = new Map<string, any>()

  register<T>(key: string, instance: T): void {
    this.services.set(key, instance)
  }

  get<T>(key: string): T {
    const service = this.services.get(key)
    if (!service) {
      throw new Error(`Service ${key} not found in container`)
    }
    return service
  }
}

export const container = new Container()
