import { memo, useCallback } from "react";
import { PatchbayProps } from "../types/index.js";
import PatchPort from "./PatchPort";
import PatchbayInputLabel from "./PatchbayInputLabel";
import PatchbayOutputLabel from "./PatchbayOutputLabel";

const PatchbayControls = ({sources, destinations, patch}: PatchbayProps) => {

  const onValueChange = useCallback(
    (sourceId: number, destId: number, value: boolean) => {
      if (!destinations[destId].isSelected || sources[sourceId].id === destinations[destId].connectedSource) {
        patch(sources[sourceId].id, destId, value);
      }
    }, 
    [sources, patch]
  );

  return (
    <div className="control-container">
      <div className="row justify-center">
        <div className="title-container">
          <label className="unselectable title-big">{`PATCHBAY`}</label>
        </div>
      </div>
      <div className="row justify-center">
        <div className="frequency-container">
          <div className="row justify-center">
            <div className="column hasTooltip">
              <table style={{borderCollapse: 'collapse', borderSpacing: '0'}}>
                <tr>
                  <td style={{width: '1px'}}></td>
                  {
                    destinations.map((destination) => {
                      return (
                        <td style={{width: '1px'}}>
                          <PatchbayOutputLabel name={destination.name} />
                        </td>
                      );
                    })
                  }
                </tr>
                {
                  sources.map((source) => {
                    return (
                      <tr>
                        <td style={{width: '100px'}}>
                          <PatchbayInputLabel name={source.name} />
                        </td>
                          {
                            destinations.map((destination) => {
                              return (
                                <td style={{width: '1px'}}>
                                  <PatchPort 
                                    sourceId={source.id}
                                    destId={destination.id} 
                                    isSelected={destination.isSelected && source.destination === destination.id} 
                                    onValueChange={onValueChange} 
                                  />
                                </td>
                              )
                            })
                          }
                      </tr>
                    );
                  })
                }
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PatchbayControls);

