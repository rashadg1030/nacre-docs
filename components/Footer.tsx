export function Footer() {
  return (
    <footer className="py-8 text-center">
      <p className="text-sm text-fd-muted-foreground">
        &copy; {new Date().getFullYear()} Nacre. Released under the BSD-3-Clause License.
      </p>
    </footer>
  );
}
