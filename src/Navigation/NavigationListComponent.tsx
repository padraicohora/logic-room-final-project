import { useInjection } from '../Core/WithPresenter'
import { Types } from '../Core/Types'
import { NavigationPresenterI } from './NavigationPresenter'
import { TreeModelNode } from './NavigationTree'
import { useState } from 'react'

const NavigationListComponent = ({ node }) => {
  const viewModel = useInjection<NavigationPresenterI>(Types.NavigationPresenter)
  const [expand, setExpand] = useState<boolean>(true)

  return (
    <>
      <div>
        {node.type === 'expand' ? (
          <button onClick={() => setExpand((current) => !current)} style={{ backgroundColor: 'lightblue' }}>
            {expand ? '- ' : '+ '}
            {node.text}
          </button>
        ) : (
          <button style={{ backgroundColor: 'deeppink' }} onClick={() => viewModel.goToId(node.id)}>
            {node.text}
          </button>
        )}
      </div>
      {expand && (
        <div>
          {node.children &&
            node.children.map((child: TreeModelNode) => (
              <div>
                <button
                  style={{
                    backgroundColor: 'deeppink',
                  }}
                  onClick={() => viewModel.goToId(child.id)}
                >
                  {child.text}
                </button>
              </div>
            ))}
        </div>
      )}
    </>
  )
}

export default NavigationListComponent
