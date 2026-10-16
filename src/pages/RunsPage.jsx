import Runs from '../components/Runs/Runs'
import RunShell from '../components/Runs/RunShell'

// Standalone /runs page: the running gallery on its own, reached from the
// "See my runs" button in the About section.
export default function RunsPage() {
  return (
    <RunShell>
      <main>
        <Runs />
      </main>
    </RunShell>
  )
}
