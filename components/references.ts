// Single source of truth for the deck's bibliography.
//
// Every citation in the deck flows from here:
//   - <Cites refs="1,3" />  renders the per-slide footnotes from `short`
//   - <References />        renders the final References slide from `full`
//
// Add or edit an entry once; numbering and both renderings stay in sync.
export interface Reference {
  /** Compact form used in the per-slide footnotes. */
  short: string
  /** Full citation (HTML allowed, e.g. <em>) used on the References slide. */
  full: string
}

export const REFERENCES: Record<number, Reference> = {
  1: {
    short: 'Beal et al. — Aggregate Programming for the IoT. IEEE Computer, 2015',
    full: 'J. Beal, D. Pianini, M. Viroli. <em>Aggregate Programming for the Internet of Things</em>. IEEE Computer, 2015.',
  },
  2: {
    short: 'Casadei — Macroprogramming: Concepts & State of the Art. ACM CSUR, 2023',
    full: 'R. Casadei. <em>Macroprogramming: Concepts, State of the Art, and Opportunities</em>. ACM Comput. Surv., 2023.',
  },
  3: {
    short: 'Audrito et al. — A Higher-Order Calculus of Computational Fields. ACM TOCL, 2019',
    full: 'G. Audrito, M. Viroli, F. Damiani, D. Pianini, J. Beal. <em>A Higher-Order Calculus of Computational Fields</em>. ACM TOCL, 2019.',
  },
  4: {
    short: 'Pianini et al. — Protelis: Practical Aggregate Programming. ACM SAC, 2015',
    full: 'D. Pianini, M. Viroli, J. Beal. <em>Protelis: Practical Aggregate Programming</em>. ACM SAC, 2015.',
  },
  5: {
    short: 'Casadei et al. — ScaFi: A Scala DSL for Aggregate Programming. SoftwareX, 2022',
    full: 'R. Casadei, M. Viroli, G. Aguzzi, D. Pianini. <em>ScaFi: A Scala DSL &amp; Toolkit for Aggregate Programming</em>. SoftwareX, 2022.',
  },
  6: {
    short: 'Casadei et al. — Self-organising Coordination Regions. COORDINATION, 2019',
    full: 'R. Casadei, D. Pianini, M. Viroli, A. Natali. <em>Self-organising Coordination Regions</em>. COORDINATION, 2019.',
  },
  7: {
    short: 'Mo et al. — Aggregate Computing for Self-stabilizing Leader Election. IEEE FAS*W, 2018',
    full: 'Y. Mo, J. Beal, S. Dasgupta. <em>An Aggregate Computing Approach to Self-stabilizing Leader Election</em>. IEEE FAS*W, 2018.',
  },
  8: {
    short: 'McMahan et al. — Communication-Efficient Learning from Decentralized Data. AISTATS, 2017',
    full: 'B. McMahan, E. Moore, D. Ramage, S. Hampson, B. Agüera y Arcas. <em>Communication-Efficient Learning of Deep Networks from Decentralized Data</em>. AISTATS, 2017.',
  },
  9: {
    short: 'Domini et al. — FBFL: Field-based Coordination for Federated Learning. LMCS, 2026',
    full: 'D. Domini, G. Aguzzi, L. Esterle, M. Viroli. <em>FBFL: A Field-based Coordination Approach for Federated Learning</em>. LMCS, 2026.',
  },
  10: {
    short: 'Domini et al. — Decentralized Proximity-aware Clustering for Self-Federated Learning. IoT, 2026',
    full: 'D. Domini, N. Farabegoli, G. Aguzzi, M. Viroli, L. Esterle. <em>Decentralized Proximity-aware Clustering for Collective Self-Federated Learning</em>. Internet of Things, 2026.',
  },
  11: {
    short: 'Bettini et al. — VMAS: A Vectorized Multi-Agent Simulator. DARS, 2022',
    full: 'M. Bettini, R. Kortvelesy, J. Blumenkamp, A. Prorok. <em>VMAS: A Vectorized Multi-Agent Simulator for Collective Robot Learning</em>. DARS, 2022.',
  },
  12: {
    short: 'Vicsek et al. — Novel Type of Phase Transition in Self-driven Particles. PRL, 1995',
    full: 'T. Vicsek, A. Czirók, E. Ben-Jacob, I. Cohen, O. Shochet. <em>Novel Type of Phase Transition in a System of Self-driven Particles</em>. Phys. Rev. Lett., 1995.',
  },
}
