import type { UnwrapRef } from "vue";
import { useStorage, StorageSerializers } from "@vueuse/core";
import { reactive, watch } from "vue";

// Interface for StorageMap
export interface StorageMap<K, V> {
  size: number; // Size of the map
  add(value: V, keyField: keyof V): this; // Add a value using one of its fields as key
  addMany(values: V[], keyField: keyof V): this; // Add multiple values using a specified field as key
  clear(): void; // Clear the map
  set(key: K, value: V): this; // Set a key-value pair
  get(key: K): V | undefined; // Get a value by key
  delete(key: K): boolean; // Delete a key-value pair
  has(key: K): boolean; // Check if a key exists
  toArray(): V[]; // Convert to array of values
  toJSON(): [K, V][]; // Convert to JSON serializable format
  fromJSON(entries: [K, V][]): void; // Initialize from JSON format
  entries(): IterableIterator<[K, V]>; // Support for...of and destructuring
  [Symbol.iterator](): IterableIterator<[K, V]>; // Make the object iterable
}

// Type for the return value of useStorageMap
export type StorageMapRef<K, V> = UnwrapRef<StorageMap<K, V>>;

// Implementation of StorageMap
export class StorageMapImpl<K, V> implements StorageMap<K, V> {
  private map = new Map<K, V>();

  get size(): number {
    return this.map.size;
  }

  constructor(entries?: [K, V][]) {
    if (entries) {
      try {
        if (Array.isArray(entries)) {
          entries.forEach((entry) => {
            if (Array.isArray(entry) && entry.length === 2) {
              const [key, value] = entry;
              this.map.set(key, value);
            }
          });
        } else {
          console.warn(
            "Constructor entries is not an array, initializing empty map"
          );
        }
      } catch (error) {
        console.error("Error initializing StorableMapImpl:", error);
      }
    }
  }

  // Add a value using one of its properties as the key
  add(value: V, keyField: keyof V): this {
    if (
      typeof value[keyField] === "string" ||
      typeof value[keyField] === "number"
    ) {
      const key = value[keyField] as unknown as K;
      this.map.set(key, value);
    } else {
      console.warn("keyField must be a string or number property of the value");
    }
    return this;
  }

  // Add multiple values using a specified property as the key
  addMany(values: V[], keyField: keyof V): this {
    if (!Array.isArray(values)) {
      console.warn("values must be an array");
      return this;
    }

    values.forEach((value) => {
      this.add(value, keyField);
    });

    return this;
  }

  // Clear the map
  clear(): void {
    this.map.clear();
  }

  // Set a value with an explicit key
  set(key: K, value: V): this {
    this.map.set(key, value);
    return this;
  }

  // Get a value by key
  get(key: K): V | undefined {
    return this.map.get(key);
  }

  // Delete a key-value pair
  delete(key: K): boolean {
    return this.map.delete(key);
  }

  // Check if a key exists
  has(key: K): boolean {
    return this.map.has(key);
  }

  // Convert to array of values
  toArray(): V[] {
    return Array.from(this.map.values());
  }

  // Convert to JSON serializable format (array of key-value pairs)
  toJSON(): [K, V][] {
    return Array.from(this.map.entries());
  }

  // Initialize from JSON format
  fromJSON(entries: [K, V][]): void {
    this.map.clear();
    entries.forEach(([key, value]) => this.map.set(key, value));
  }

  // Support for...of and destructuring
  entries(): IterableIterator<[K, V]> {
    return this.map.entries();
  }

  // Make the object iterable
  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.map.entries();
  }
}

// Composable for storing Map-like structures in localStorage/sessionStorage
export function useStorageMap<K, V>(
  key: string,
  initialEntries: [K, V][] = [],
  storage = localStorage
): StorageMapRef<K, V> {
  // Get data from storage with error handling
  const storedData = useStorage<[K, V][]>(key, initialEntries, storage, {
    serializer: StorageSerializers.object,
  });

  // Check and ensure valid data
  let validData: [K, V][] = [];

  // Handle invalid data
  try {
    // Ensure storedData.value is an array
    if (Array.isArray(storedData.value)) {
      validData = storedData.value;
    } else {
      console.warn(
        `Stored data for key "${key}" is not valid. Initializing with empty array.`
      );
      storedData.value = [];
      validData = [];
    }
  } catch (error) {
    console.error(`Error processing stored data for key "${key}":`, error);
    storedData.value = [];
    validData = [];
  }

  // Create StorageMap from stored data
  const state = reactive(new StorageMapImpl<K, V>(validData)) as StorageMapRef<
    K,
    V
  >;

  // Watch for changes and update storage
  watch(
    state,
    () => {
      try {
        storedData.value = state.toJSON();
      } catch (error) {
        console.error(`Error updating stored data for key "${key}":`, error);
      }
    },
    { deep: true }
  );

  return state;
}
