import {TestFlattener} from '@/components/test-flattener';
import {ComponentTypes} from '@/components/component-types';

describe('TestFlattener', () => {
    it('Flattens requisitions', () => {
        const requisition: any = {
            name: 'requisition',
            id: 'requisition',
            valid: true,
            hooks: {
                onHook: {
                    valid: true,
                    tests: [{
                        description: 'description',
                        name: 'test',
                        valid: true,
                    }]
                }
            }
        };

        const flattenTests = new TestFlattener().flatten(requisition);
        expect(flattenTests).toEqual([
            {
                description: 'description',
                hierarchy: [
                    {
                        id: expect.any(String),
                        name: 'onHook'
                    }
                ],
                id: expect.any(String),
                name: 'test',
                valid: true
            }
        ]);
    });

    it('Concatenates requisition #', () => {
        const requisition: any = {
            name: 'requisition',
            iteration: 4,
            totalIterations: 5,
            valid: true,
            hooks: {
                onHook: {
                    valid: true,
                    tests: [{
                        description: 'description',
                        name: 'test',
                        valid: true,
                    }]
                }
            }
        };

        const flattenTests = new TestFlattener().flatten(requisition);
        expect(flattenTests).toEqual([
                {
                    description: 'description',
                    hierarchy: [
                        {
                            id: expect.any(String),
                            name: 'onHook'
                        }
                    ],
                    id: expect.any(String),
                    name: 'test',
                    valid: true
                }
            ]
        );
    });

    it('Handle empty hooks', () => {
        const requisition: any = {
            name: 'requisition',
            iteration: 4,
            totalIterations: 5,
            valid: true,
            hooks: {}
        };

        const flattenTests = new TestFlattener().flatten(requisition);
        expect(flattenTests).toEqual([]);
    });

    it('Flatten deeper publishers', () => {
        const requisition: any = {
            name: 'requisition',
            valid: true,
            id: 'requisition',
            publishers: [{
                name: 'publisher',
                id: 'publisher',
                hooks: {
                    onHook: {
                        valid: true,
                        tests: [{
                            description: 'description',
                            name: 'test',
                            valid: true,
                        }]
                    }
                }
            }]
        };

        const flattenTests = new TestFlattener().flatten(requisition);
        expect(flattenTests).toEqual([
            {
                description: 'description',
                hierarchy: [
                    {
                        id: 'publisher',
                        name: 'publisher',
                        type: ComponentTypes.PUBLISHER
                    },
                    {
                        id: expect.any(String),
                        name: 'onHook'
                    }
                ],
                id: expect.any(String),
                name: 'test',
                valid: true
            }
        ]);
    });

    it('Flatten deeper subscriptions', () => {
        const requisition: any = {
            name: 'requisition',
            valid: true,
            subscriptions: [{
                name: 'subscription',
                hooks: {
                    onHook: {
                        valid: true,
                        tests: [{
                            description: 'description',
                            name: 'test',
                            valid: true,
                        }]
                    }
                }
            }]
        };

        const flattenTests = new TestFlattener().flatten(requisition);
        expect(flattenTests).toEqual([
            {
                description: 'description',
                hierarchy: [
                    {
                        name: 'subscription',
                        type: ComponentTypes.SUBSCRIPTION
                    },
                    {
                        id: expect.any(String),
                        name: 'onHook'
                    }
                ],
                id: expect.any(String),
                name: 'test',
                valid: true
            }
        ]);
    });

    it('Flatten deeper requisitions', () => {
        const requisition: any = {
            name: 'requisition',
            valid: true,
            requisitions: [{
                name: 'requisition',
                iteration: 3,
                totalIterations: 5,
                hooks: {
                    onHook: {
                        valid: true,
                        tests: [{
                            description: 'description',
                            name: 'test',
                            valid: true,
                        }]
                    }
                }
            }]
        };

        const flattenTests = new TestFlattener().flatten(requisition);
        expect(flattenTests).toEqual([
            {
                description: 'description',
                hierarchy: [
                    {
                        name: 'requisition [3]',
                        type: ComponentTypes.REQUISITION
                    },
                    {
                        id: expect.any(String),
                        name: 'onHook'
                    }
                ],
                id: expect.any(String),
                name: 'test',
                valid: true
            }
        ]);
    });
});
